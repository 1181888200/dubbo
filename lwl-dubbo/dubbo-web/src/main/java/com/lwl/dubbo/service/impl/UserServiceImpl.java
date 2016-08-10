package com.lwl.dubbo.service.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.lwl.dubbo.dao.UserDao;
import com.lwl.dubbo.domain.User;
import com.lwl.dubbo.rpc.RPCResponse;
import com.lwl.dubbo.service.UserService;

@Service("userService")
public class UserServiceImpl implements UserService {

	@Resource(name="userDao")
	private UserDao userDao;
	
	@Override
	public RPCResponse<User> findUserById(long id) {
		//这里使用封装类,而不是DAO继续使用封装类,是为了DAO层更好的复用起来
		RPCResponse<User> response = new RPCResponse<User>();
		try {
			//DAO层和我们之前开发的模式一样，没有使用封装类
			User result = userDao.findUserById(id);
			response.setResult(result);
		} catch (Exception e) {
			e.printStackTrace();
			response.setSuccess(false);
			response.setErrorMessage(e.getMessage());
		}
		
		return response;
	}

	//调用这个方法 会抛出异常
	@Override
	public RPCResponse<User> findUserThrowsException() {
		RPCResponse<User> response = new RPCResponse<User>();
		try {
			User result = userDao.findUserThrowsException();
			response.setResult(result);
		} catch (Exception e) {
			e.printStackTrace();
			response.setSuccess(false);
			response.setErrorMessage(e.getMessage());
		}
		return response;
	}

}
