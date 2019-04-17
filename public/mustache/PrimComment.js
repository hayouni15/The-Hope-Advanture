const PrimComment='<div class="comment-list" style="padding-bottom: 16px;">\
<div class="single-comment justify-content-between d-flex">\
    <div class="user justify-content-between d-flex">\
        <div class="thumb">\
        <div style="width: 38px;height: 38px;background: {{color}};border-radius: 100px;text-align: center;padding-top: 8px;text-transform: uppercase;color: beige;">{{logo}}</div>\
        </div>\
        <div class="desc">\
            <h5><a href="#">{{Comment_author}}</a></h5>\
            <p style="    margin-bottom: 0px;" class="date">{{createdAt}} </p>\
            <p class="comment">\
                {{Comment_content}}\
            </p>\
        </div>\
    </div>\
    <div class="reply-btn">\
        <a name="{{_id}}" href="" class="btn-reply text-uppercase">reply</a>\
    </div>\
</div>\
</div>\
'
