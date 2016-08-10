package com.lwl.dubbo.respone;
/**
 * 用于将结果集返回给前端
 * @author Administrator
 * @create 2016-8-9 下午12:21:24
 * @version 1.0
 */
public class ResultRespone {

	
	private boolean success = true;//是否成功
	
	private String msg;//错误信息或者提示信息
	
	private Object data;//数据结果集

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}
	
}
