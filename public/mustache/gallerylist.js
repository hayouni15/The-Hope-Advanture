const gallerylist='<div class="table-row">\
<div class="serial" style="text-transform: uppercase;">{{Gallery_place}}</div>\
<div class="country">{{Gallery_Title}}</div>\
<div class="percentage">\
    <div class="progress">\
        <div class="progress-bar color-{{colornumber}}" role="progressbar" style="width: {{barwidth}}%;height: 15px"\
            aria-valuenow="{{Pictures_number}}" aria-valuemin="0" aria-valuemax="30">{{Pictures_number}}</div>\
    </div>\
</div>\
<div class="visit" >\
    <div class="opengallery" name="{{Gallery_Title}}"  style="border: 1px solid #0000ff61;padding: 5px;cursor: pointer;"><i\
            class="fa fa-camera-retro" style="margin-right: 5px;"></i>Open Gallery</div>\
</div>\
</div>'