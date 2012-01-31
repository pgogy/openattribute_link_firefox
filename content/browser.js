var open_attribute_link = new Object;
open_attribute_link.document_node = "";
open_attribute_link.urls_checked = new Array();

var open_attribute_link_page_process = new function open_attribute_link_page_process() {

		this.contains = function(a, obj) {
			for (var i = 0; i < a.length; i++) {
				if (a[i] === obj) {
					return true;
				}
			}
			return false;
		}

		this.check_url = function(url,node_to_change){

			var xmlHttpRequest = new XMLHttpRequest();

			xmlHttpRequest.open("GET",url, true);
			xmlHttpRequest.onreadystatechange=function(){
				  
				if (xmlHttpRequest.readyState==4){
							
					var myregexp_fat = new RegExp('rel="license" href="http://creativecommons.org/licenses/',"i");	
					var myregexp_thin = new RegExp("Creative Commons","i");	
				
					if(node_to_change.innerHTML.indexOf("(&copy;")==-1){
				
						if(xmlHttpRequest.responseText.match(myregexp_fat)){
												
							node_to_change.style.color="#00FF00";
							if(node_to_change.innerHTML.indexOf("<img")==-1){
							
								node_to_change.innerHTML += " (&copy; &#10003;)";
								
							}else{
							
								node_to_change.style.border = "2px solid #00ff00";
							
							}
										
						}else if(xmlHttpRequest.responseText.match(myregexp_thin)){
											
							node_to_change.style.color="#AAAA66";
							
							if(node_to_change.innerHTML.indexOf("<img")==-1){
							
								node_to_change.innerHTML += " (&copy; ?)";
								
							}else{
							
								node_to_change.style.border = "2px solid #00ff00";
							
							}
						
						}else{
											
							if(node_to_change.innerHTML.indexOf("<img")==-1){
							
								node_to_change.innerHTML += " (&copy;)";
								
							}else{
							
								node_to_change.style.border = "2px solid #00ff00";
							
							}
						
						}
					
					}
								
				}
			
					
			};
							
			xmlHttpRequest.send();

		}

		this.init = function (content_passed) {
				
			var n = content_passed;			
			
			open_attribute_link.document_node = content_passed;
									
			var rootNode = n;
			
			while (n) {
	
				if(n.hasAttributes()){
				
					if(n.hasAttribute("href")){
					
						if(n.href.indexOf("google")==-1){
					
							if(!this.contains(open_attribute_link.urls_checked,n.href)){
					
								this.check_url(n.href,n);
								open_attribute_link.urls_checked.push(n.href);
							
							}
							
						}
						
					}
				
				}

				if (n.v) {
					n.v = false;
					if (n == rootNode) {
						break;
					}
					if (n.nextSibling) {
						n = n.nextSibling;
					}
					else {
						n = n.parentNode;
					}
				}
				else {
					
					if (n.firstChild) {
						n.v = true;
						n = n.firstChild;
					}else if (n.nextSibling) {
						n = n.nextSibling;
					}else {
						n = n.parentNode;
					}
				}
				
			}
			
			open_attribute_link.urls_checked = new Array();
			
		}; 
		
};
		