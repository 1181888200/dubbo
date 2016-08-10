package com.lwl.dubbo.dao;

import com.lwl.dubbo.domain.User;

public interface UserDao {

	public User findUserById(long id);
	
	public User findUserThrowsException();
	
}
