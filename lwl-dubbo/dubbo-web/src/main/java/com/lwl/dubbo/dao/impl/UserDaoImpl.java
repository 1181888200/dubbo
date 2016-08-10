package com.lwl.dubbo.dao.impl;

import org.springframework.stereotype.Repository;

import com.lwl.dubbo.dao.UserDao;
import com.lwl.dubbo.domain.User;
/**
 * DAO数据层操作
 * @author Administrator
 * @create 2016-8-9 上午10:30:03
 * @version 1.0
 */
@Repository("userDao")
public class UserDaoImpl implements UserDao {

	/**
	 * 通过模拟数据库数据，返回结果
	 * 		看客可以根据自己需要 从数据库获取数据然后返回
	 * @param id
	 * @return
	 * @author Administrator
	 * @create 2016-8-9 上午10:31:34
	 */
	@Override
	public User findUserById(long id) {
		User info = new User();
		info.setId(id);
		info.setEmail("xxxxxxxxxx@163.com");
		info.setMobile("13844445555");
		info.setUsername("宇宙最帅");
		info.setPassword("12345600");
		return info;
	}

	@Override
	public User findUserThrowsException() {
		//让程序出错，便于返回测试
		int i = 1/0;
		System.out.println(i);
		return null;
	}

}
