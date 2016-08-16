(function(window,$) {
	$(function(){
		let doc_url = "https://raw.githubusercontent.com/vvpvvp/momentjs/master/README.md";
		$.get(doc_url, function(data) {
			let _content = $(marked(data)),_right = $("#right");
            _right.append(_content);
			$("h1:first,h2:first",_right).remove();
			$("p",_right).slice(0,2).remove();
            let lis = $("<ul>");

            $("#left").append(lis);
            // 完成代码高亮
            $('#right code').map(function() {
              Prism.highlightElement(this);
            });

            let titles = $("h1,h2,h3,h4",_right);
            titles.each(function(i,n){
            	let _n = $(n);
                  n.id = _n.text();
            	let li = $("<li class='"+n.tagName+"'>"+_n.text()+"</li>");
            	li.on("click",function(argument) {
            		$(".selected",lis).removeClass("selected");
            		li.addClass("selected");
            		window.location.hash = "#doc_" + _n.text();
            		$("body").animate({
            			"scrollTop":(_n.position().top-60)
            		})
            	});
            	lis.append(li);
            })
            
        });
	});
})(window,$)