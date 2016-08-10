/**
 * Created by luwenxull on 2015/9/24.
 */
var resolveAjax={
    getTopic:{
        url:'/special-web/haining/survey/get/topic',
        params:{hospitalId:10143},
        successCallback:function(data){
             window.zhicall_topicId=data.data[0].id;
             window.localStorage.setItem("subjectId",data.data[0].id);
            this.setState({topics:data.data});
             this.subjectReady();
        },
        errorCallback:function(data){}
    },
    getFirstSubject:{
        url:'/special-web/haining/survey/get/subject/start',
        params:{hospitalId:10143},
        resolveParams:function(param){
            this.params[param.key]=param.value;
        },
        successCallback:function(data){
            if(data.success){
                this.subjectList.push(data);
                this.getSubjectIndex().add();
                window.zhicall_nextSubjectId=data.data.option[0].nextSubjectId;
                this.replaceState({options:data.data.option,title:data.data.title,isCheckBox:data.data.isCheckBox});     
            }else{
                alert(data.errMsg);
            }
        },
        errorCallback:function(){}
    },
    getNextSubject:{
        url:'/special-web/haining/survey/get/subject/one',
        params:{hospitalId:10143},
        resolveParams:function(param){
            this.params[param.key]=param.value;
        },
        successCallback:function(data){
            window.zhicall_nextSubjectId=data.data.option[0].nextSubjectId;
            this.subjectList[this.getSubjectIndex().get()]=data;
            this.getSubjectIndex().add();
            this.replaceState({options:data.data.option,title:data.data.title,isCheckBox:data.data.isCheckBox});
        },
        errorCallback:function(){}
    },
    submit:{
        url:'/special-web/haining/survey/answer',
        params:{hospitalId:10143,visitDoctorId:0,
            patientId:0,accountId:0,deptId:0,expertId:0,
            submitterName:localStorage.getItem('name'),submitterMobileNo:localStorage.getItem('medCard')
        },
        resolveParams:function(param){
            this.params[param.key]=param.value;
        },
        successCallback:function(data){
        },
        errorCallback:function(){}
    }
};

/*
 * 满意度调查
 * container
 * */
var Survey = React.createClass({displayName: "Survey",
    mixins:[resolveAjax],
    getInitialState: function() {
        return {
            beforeSelect:true 
        };
    },
    subjectReady:function(){
        this.getFirstSubject.resolveParams({key:'topicId',value:window.zhicall_topicId});
        $.ajax({
            url: this.getFirstSubject.url,
            type: 'post',
            data: this.getFirstSubject.params,
            dataType: 'json',
            cache: false,
            success: this.getFirstSubject.successCallback.bind(this),
            error: this.getFirstSubject.errorCallback.bind(this)
        });
    },
    componentWillMount: function () {
        // console.log(this.getTopic);
        $.ajax({
            url: this.getTopic.url,
            type: 'post',
            data: this.getTopic.params,
            dataType: 'json',
            cache: false,
            async: false,
            success: this.getTopic.successCallback.bind(this),
            error: this.getTopic.errorCallback.bind(this)
        });
    },
    buttonText:{
        pre:{
            one:'上一题',
            two:'下一题'
        },
        last:{
            one:'重置',
            two:'提交'
        }
    },
    subjectList:[],
    getSubjectIndex:function(){
        if(!this.subjectIndex){
            this.subjectIndex={
                index:0,
                get:function(){return this.index},
                add:function(){this.index++},
                reduce:function(){this.index--}
            }
        }
        return this.subjectIndex;
    },
    nextSubject:function(){
        var focused=false;
        $('input').each(function(){
            if($(this).prop('checked')){
                focused=true;
            }
        });
        if(focused){
            var index=this.getSubjectIndex().get();
        if(index<this.subjectList.length){ 
            var data=this.subjectList[index];
            this.replaceState({options:data.data.option,title:data.data.title,isCheckBox:data.data.isCheckBox});
            this.getSubjectIndex().add();
            return;
        }
        if(window.zhicall_nextSubjectId==0) {
            this.setState({last:true});
            return;
        };
        this.getNextSubject.resolveParams({key:'subjectId',value:window.zhicall_nextSubjectId});
        $.ajax({
            url: this.getNextSubject.url,
            type: 'post',
            data: this.getNextSubject.params,
            dataType: 'json',
            cache: false,
            success: this.getNextSubject.successCallback.bind(this),
            error: this.getNextSubject.errorCallback.bind(this)
        });
        }else{
            alert('请先选择一个选项');
        }
        
    },
    lastSubject:function(){
        if(this.getSubjectIndex().index==1) return;
        this.getSubjectIndex().reduce();
        var data=this.subjectList[this.getSubjectIndex().get()-1];
        this.replaceState({options:data.data.option,title:data.data.title,isCheckBox:data.data.isCheckBox});
    },
    handleFocus:function(node){
         var  type = $(node).attr("type");
         var result = $(node).val();
         //针对复选框进行操作
         if(type=='checkbox'){
        	 result = "";
        	 $("input[type=checkbox]").each(function(){
        		    if(this.checked){
        		    	result += $(this).val()+",";
        		    }
            });
        	if(result!=""){
        		result = result.substring(0, result.length-1);
        	} 
         }
        this.subjectList[this.getSubjectIndex().get()-1].value=result;
    },
    reset:function(){
        $('textarea').val('');
    },
    handelSubmit:function(){
        var answer=[];
        this.subjectList.forEach(function(subject,index){
            answer.push(subject.data.id+':'+subject.value);
        });
        this.submit.resolveParams({key:'answer',value:answer.join(';')});
        this.submit.resolveParams({key:'remark',value:$('textarea').val()});
        this.submit.resolveParams({key:'subjectId',value:localStorage.getItem('subjectId')});
        $.ajax({
            url: this.submit.url,
            type: 'post',
            data: this.submit.params,
            dataType: 'json',
            cache: false,
//            success: this.submit.successCallback.bind(this),
            success: function(text){
            	//提交结果，然后处理对应的信息
            	alert(text.errMsg);
//    		    window.location.href = "../../haining/survey/login.html";
            	localStorage.removeItem('subjectId');
            	WeixinJSBridge.call('closeWindow');
            },
            error: this.submit.errorCallback.bind(this)
        });
         
        // location.href="../index.html";
    },
    render: function () {
        if(!this.state) return false;
	        if(this.state.beforeSelect){
	            var topics=this.state.topics.map(function(topic){
	                return React.createElement(Topic, {topic: topic, getFirstSubject: this.subjectReady});
	            }.bind(this));
	            return React.createElement("div", {className: "topics"}, topics);
	        }
        var ques='问题'+this.getSubjectIndex().get();
        var buttons=React.createElement("div", {className: "buttons"}, 
                        React.createElement("button", {className: "btn", id: "bt1", onClick: this.lastSubject}, "上一题"), 
                        React.createElement("button", {className: "btn", id: "bt2", onClick: this.nextSubject}, "下一题")
                    );
        if(this.state.last){
            buttons=React.createElement("div", {className: "buttons"}, 
                        React.createElement("button", {className: "btn", id: "bt1", onClick: this.reset}, "重置"), 
                        React.createElement("button", {className: "btn", id: "bt2", onClick: this.handelSubmit}, "提交")
                    );
            ques='';
        }
        return (
            React.createElement("div", null, 
                React.createElement("div", {className: "survey"}, 
                    React.createElement("div", {className: "question-index"}, ques), 
                    React.createElement(SurveyQuestion, {options: this.state.options, title: this.state.title, ifLast: this.state.last,isCheckBox: this.state.isCheckBox, 
                                    handleFocus: this.handleFocus, val: this.subjectList[this.getSubjectIndex().get()-1].value})
                ), 
                buttons
            )

        );
    }
});

/*
 * 问题
 * */
var SurveyQuestion = React.createClass({displayName: "SurveyQuestion",
    mixins:[resolveAjax],
    componentWillReceiveProps:function(nextProp){
        $('input').attr('checked',false);
    },
    componentDidMount:function(){
        $('.survey-question').on('click','input',function(e){
            this.props.handleFocus(e.target);
        }.bind(this));
    },
    componentDidUpdate:function(){
      //console.log('survey questions');
        var inputs=$(this.getDOMNode()).find('input');
        var that=this;
        //设置答案选择
        var vals = this.props.val;
        if(vals!=null){
        	if(vals.indexOf(",")!=-1){//设置复选框默认选中
            	var options= new Array();   
        		options = vals.split(",");
        		for(var i =0;i<options.length;i++){
        			var obj = options[i];
        			inputs.each(function(){
                        if($(this).val()==obj){
                            $(this).click();
                        }
                    });
        		}
            }else{
            	inputs.each(function(){
                    if($(this).val()==that.props.val){
                        $(this).click();
                    }
                });
            }
        }
        
    },
    render: function () {
        if(!this.props.options) return false;
        var options,title;
        if(this.props.ifLast){
            options=React.createElement(SurveyText, null);
            title='您认为我们哪方面需要改进';

        }else{
            options = this.props.options.map(function (option) {
                return React.createElement(SurveyOption, {option: option, val: this.props.val,isCheckBox:this.props.isCheckBox});
            }.bind(this));
            title=this.props.title;
        }
        return (
            React.createElement("div", {className: "survey-question", id: "survey-question"}, 
                React.createElement("p", null, title), 
                options
            )
        );
    }
});

/*
 * 选项
 * */
var SurveyOption = React.createClass({displayName: "SurveyOption",
    handleClick:function(){
        this.props.handleFocus(this.getDOMNode());
    },
    render: function () {
    	var typeInfo = this.props.isCheckBox==1?"checkbox":"radio";
        return (
            React.createElement("div", {className: "option"}, 
                React.createElement("input", {type:typeInfo, name: "satisfaction", value: this.props.option.id}), 
                this.props.option.title
            )
        );
    }
});

/*输入*/
var SurveyText=React.createClass({displayName: "SurveyText",
    render:function(){
        return React.createElement("textarea", {className: "form-control", rows: "5", placeholder: "留下您宝贵的建议或意见"});
    }
});

/*选择话题*/
var Topic=React.createClass({displayName: "Topic",
    handleClick:function(){
        window.zhicall_topicId=this.props.topic.id;
        this.props.getFirstSubject();
    },
    componentDidMount: function() {
        var hammertime = new Hammer(this.getDOMNode());
        hammertime.on('tap', function(ev) {
            this.handleClick();
        }.bind(this));
    },
    render: function() {
        return (
            React.createElement("div", {className: "survey-topics"}, this.props.topic.topicName)
        );
    }
});



