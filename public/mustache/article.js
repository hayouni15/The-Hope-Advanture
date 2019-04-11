const article = '<article class="row blog_item">\
<div class="col-md-3">\
    <div class="blog_info text-right">\
        <div class="post_tag">\
            <a class="active" style="text-transform: uppercase;">{{Article_topic}}</a>\
        </div>\
        <ul class="blog_meta list">\
            <li><a >{{Author_name}}<i class="lnr lnr-user"></i></a></li>\
            <li><a >{{Article_date}}<i class="lnr lnr-calendar-full"></i></a></li>\
            <li><a >{{Article_views}}<i class="lnr lnr-eye"></i></a></li>\
            <li><a >06 Comments<i class="lnr lnr-bubble"></i></a></li>\
        </ul>\
    </div>\
</div>\
<div class="col-md-9">\
    <div class="blog_post">\
       <a  href="singleBlog/{{id}}" id={{id}} class="ArticleReadCounter"> <img src="{{Article_picture}}" alt=""></a>\
        <div class="blog_details">\
            <a href="single-blog.html">\
                <h2>{{Article_title}}</h2>\
            </a>\
            <p style="max-height: 52px;overflow: hidden;">{{Article_content}}</p>\
            <p style="    margin-top: -32px;">...</p>\
            <a  href="singleBlog/{{id}}" id={{id}} class="blog_btn ArticleReadCounter">View More</a>\
        </div>\
    </div>\
</div>\
</article>'