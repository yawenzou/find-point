import React, { Component } from 'react';
import './Point.css';

class Point extends Component {
	constructor(props) {
		super(props);
		this.state = {value: []};

		this.isNumber = this.isNumber.bind(this);
		this.findPoint = this.findPoint.bind(this);
	}

	findPoint() {
		this.setState({
			value: this.removeSpace(this.textInput.value.split(" "))
		});
	}

	isNumber(event) {
		let str = event.target.value;
		let reg = /^\d+$/;
		for (let i = 0; i < str.length; i++) {
			if( str[i] !== " " && !reg.test(str[i])) {
				this.arrAble = false;
				this.errMsg = '该数组需要全部是数字';
				break;
			}
			else {
				this.errMsg = '';
				this.arrAble = true;
			}
		}
	}

	removeSpace(arr) {
		let arr2 = [];
		for (let i= 0; i< arr.length; i++) {
			if (arr[i] !== "") {
				arr2.push(parseInt(arr[i]));
			}
		}
		return arr2;
	}


	render() {

		let arrPoint = '--';
		if (this.arrAble && (this.state.value.length > 2)) {
			let fs = 0;
			let fe = this.state.value.length-1;
			let fsTatol = this.state.value[fs];
			let feTatol = this.state.value[fe];
			while(fs !== fe-2) {
				if (fsTatol > feTatol) {
					fe--;
					feTatol += this.state.value[fe];
				}
				else {
					fs++;
					fsTatol += this.state.value[fs];
				}
			}

			if (feTatol === fsTatol) {
				arrPoint = "index = " + (fe-1) + "; value = " + this.state.value[fe-1];
			}
			else {
				arrPoint = "the arr is not has point！";
			}
		}
		else if(this.state.value.length <= 2 && this.state.value.length > 0){
			arrPoint = "The array length should be greater than 2！";
		}

		return (
			<div className="main">
				<div className="input-row clearfix">
					<span className="input-label">输入数组：</span>
					<input className="input-text"  type="text" placeholder="输入数组，用空格隔开" ref={(input) => { this.textInput=input;}} onChange={this.isNumber}/>
					<div className="sure-btn" onClick={this.findPoint}>确定</div>	
				</div>
				<p className="err-msg">{this.errMsg}</p>
				<div className="input-row clearfix">
					<span className="input-label">平衡位置：</span>
					<span className="point-num">{arrPoint}</span>
				</div>
			</div>
		);
	}
}

export default Point;