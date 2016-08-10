package com.lwl.dubbo.rpc;

import java.io.Serializable;

/**
 * 封装dubbo返回结果集合
 * @author Administrator
 * @create 2016-8-9 上午10:11:28
 * @version 1.0
 */
public class RPCResponse<T> implements Serializable {
	private static final long serialVersionUID = 1L;

	private boolean success = true;//是否成功
	
	private String errorMessage;//错误信息
	
	private Object result;//结果集
	
	private String message;//自定义信息

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public Object getResult() {
		return result;
	}

	public void setResult(Object result) {
		this.result = result;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
	
}
