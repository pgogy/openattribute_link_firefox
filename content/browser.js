function check_url(url,node_to_change){

	var xmlHttpRequest = new XMLHttpRequest();

	xmlHttpRequest.open("GET",url, true);
	xmlHttpRequest.onreadystatechange=function(){
	      
		if (xmlHttpRequest.readyState==4){
					
			var myregexp_fat = new RegExp('rel="license" href="http://creativecommons.org/licenses/',"i");	
			var myregexp_thin = new RegExp("Creative Commons","i");	
		
			if(xmlHttpRequest.responseText.match(myregexp_fat)){
			
				node_to_change.style.border="2px solid #00FF00";			
				node_to_change.style.fontWeight="bold";
			
			}else if(xmlHttpRequest.responseText.match(myregexp_thin)){
			
				node_to_change.style.border="2px solid #FFFF00";			
				node_to_change.style.fontWeight="bold";
			
			}else{

				node_to_change.style.border="2px solid #FF0000";			

			}
						
		}
	
			
	};
					
	xmlHttpRequest.send();

}

var document_node = "";

var page_process = new function page_process() {

		this.init = function (content_passed) {
				
			var n = content_passed;			
			
			document_node = content_passed;
									
			var rootNode = n;
			
			while (n) {
	
				if(n.hasAttributes()){
				
					if(n.hasAttribute("href")){
					
						if(n.href.indexOf("google")==-1){
					
							check_url(n.href,n);
							
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
					}
					else 
						if (n.nextSibling) {
							n = n.nextSibling;
						}
						else {
							n = n.parentNode;
						}
				}
				
			}
			
			urls_found = new Array();

		}; 
		
};
		