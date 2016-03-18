/*! ====================================================== *
Copyright (c) 2015, HashResearch Software Lab
Product: Litmus Charts
Author: Bastin Robins.J
Email : robin@hashresearch.com
All rights reserved.

Dependencies:
+++++++++++++++++++++++++++++++
D3js
Jquery
+++++++++++++++++++++++++++++++

Redistribution and use in source and binary forms, with or without modification, are not permitted :
1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
* ====================================================== */

(function() {
	Litmus = new Object();
	Litmus.version = 0.1;
	Litmus.author = 'Bastin Robins.J'

	/**
	 * ========================================= 
	 * Functions and utilities
	 * =========================================
	*/

	// ASYNC Query payload object
	Litmus.payload = {};

	Litmus._get = function(object, url) {

		$.ajax({
			url   :  url,
			method: 'GET',
			data  :  object,
		})
		.done(function(data) {
			// Do something
			console.log(data);
		})
		.fail(function(e, data) {
			// Throw error notification
			console.log(e);
			console.log(data);
		});

	}


	/**
	 * ===========================================
	 * 	Charting & Reporting 
	 * ===========================================
	 */
	
	/**
	 * [treemap description]
	 * @param  {[type]} object [description]
	 * @return {[type]}        [description]
	 */
	Litmus.treemap = function(object) {
	}

	/**
	 * [calender description]
	 * @param  {[type]} object [description]
	 * @return {[type]}        [description]
	 */
	Litmus.calender = function(object) {

	}
	


})(); // End