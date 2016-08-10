package com.lwl.dubbo.service;

import com.lwl.dubbo.domain.User;
import com.lwl.dubbo.rpc.RPCResponse;
/**
 * 用户的接口
 * @author Administrator
 * @create 2016-8-9 下午2:42:56
 * @version 1.0
 */
public interface UserService {

	/**
	 * 正常调用
	 * @param id
	 * @return
	 * @author Administrator
	 * @create 2016-8-9 上午10:16:50
	 */
	public RPCResponse<User> findUserById(long id);
	
	/**
	 * 调用该方法会抛出异常
	 * @return
	 * @author Administrator
	 * @create 2016-8-9 上午10:17:33
	 */
	public RPCResponse<User> findUserThrowsException();
	
}
