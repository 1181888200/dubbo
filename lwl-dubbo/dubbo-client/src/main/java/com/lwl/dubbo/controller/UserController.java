package com.lwl.dubbo.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lwl.dubbo.domain.User;
import com.lwl.dubbo.respone.ResultRespone;
import com.lwl.dubbo.rpc.RPCResponse;
import com.lwl.dubbo.service.UserService;

@Controller
@RequestMapping("/user")
public class UserController {

	@Resource(name="userService")
	private UserService userService;
	
	@ResponseBody
	@RequestMapping(value="/id",method=RequestMethod.POST)
	public ResultRespone findUserById(long id){
		ResultRespone respone = new ResultRespone();
		 RPCResponse<User>  result = userService.findUserById(id);
		 if(result.isSuccess()){
			 respone.setData(result.getResult());
		 }else{
			 respone.setSuccess(false);
			 respone.setMsg(result.getErrorMessage());
		 }
		return respone;
	}
	
	@ResponseBody
	@RequestMapping(value="/exception",method=RequestMethod.POST)
	public ResultRespone findUserThrowsException(){
		ResultRespone respone = new ResultRespone();
		 RPCResponse<User>  result = userService.findUserThrowsException();
		 if(result.isSuccess()){
			 respone.setData(result.getResult());
		 }else{
			 respone.setSuccess(false);
			 respone.setMsg(result.getErrorMessage());
		 }
		return respone;
	}
	
}
