# dubbo
dubbo服务的实战使用代码

1.dubbo项目结构

       	dubbo-service 项目 	主要用于接口的定义，提供对外接口

       	dubbo-web     项目 	主要用于service项目的接口实现和dubbo服务生产者的配置文件信息
	
       	dubbo-client  项目	主要用于调用方（消费者）调用dubbo服务的示例和相关调用方的配置信息
	
2.dubbo启动先后

           第一步：首先将三个文件通过maven导入到eclipse中

       	第二步：将各自的pom文件架包下载完全保证项目不会出错（dubbo-service的jar包需要第三步）
	
       	第三步：各个项目都已经成功加载到eclipse中，然后通过maven给dubbo-service打包成jar包，提供给其他2个项目依赖
	
       	第四部：将dubbo-web修改为web项目，添加到tomcat下运行，如果正常则进行第五步，如果异常一般是架包的问题，
       请自己解决或者去我的博客留言http://blog.csdn.net/lovelong8808/article/details/52162498
	
       	第五步：将dubbo-client修改为web项目，添加到tomcat下，此时tomcat下有dubbo-web和dubbo-client2个项目，
	同时运行，然后启动浏览器http://localhost:8080/dubbo-client/index.html

查看代码演示即可。
