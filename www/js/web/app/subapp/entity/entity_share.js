define(['jquery', 'libs/Class','underscore','bootbox','libs/qrcode'], function(
    $, Class,_,bootbox
){

    var EntityShareApp= Class.extend({
        init: function(){
            this.initQrcodeImage();
            this.weibo_share_service_url = 'http://service.weibo.com/share/share.php';
            this.qq_share_service_url = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey';
            this.share_weixin_modal_content = $('#share_weixin_modal_content').html();

            this.shareTitle = '由果库网友分享的互联网上可购买得到的商品信息，透过网友们自发的喜爱、客观中立的点评，帮助你更便捷地发现好物，更高效地做出消费决策。';
            this.sharePic = '';

            this.weiboShareOptions = {
                url: this.getShareUrl(),
                title: this.shareTitle,
                type:'6',
                count:'0',
                appkey:'1459383851',
                ralateUid:'2179686555',
                language:'zh_cn',
                pic: this.sharePic,
                rnd : new Date().valueOf()
            };

             this.qqShareOptions ={
                url: this.getShareUrl(),
                showcount: 0 ,
                desc: this.shareTitle,
                summary: '果库推荐商品概要',
                title: '#果库推荐商品标题#',
                site: '果库网',
                pics: this.sharePic
            };

            this.setupShareTrigger();

        },

        initQrcodeImage: function(){
            var url = this.getShareUrl();

            new QRCode(document.getElementById('qr_code'),
                {
                    text: url,
                    width: 128,
                    height: 128,
                    }
                );

        },

        getShareUrl: function(){
            return location.href.replace(/m\.guoku\.com/, 'www.guoku.com');
        },

        showWeixinShareDialog: function(){
            bootbox.hideAll();
            bootbox.dialog({
                title: '分享 精选商品 微信 modal title',
                onEscape: true,
                backdrop:true,
                closeButton: true,
                animate: true,
                className: 'entity-share-wx-dialog',
                message: this.share_weixin_modal_content

            });
            // need create a qrcode for share when bootbox showup
            var url = this.getShareUrl();
            window.setTimeout(function(){
                new QRCode(document.getElementById('qr_code_window'),
                    {
                        text: url,
                        width: 218,
                        height: 218
                    }
                );
            }, 1);

        },

        setupShareTrigger: function(){

            $('.entity-share-wrapper .share-btn-weibo').each(this.setupWeiboShareBtn.bind(this));
            $('.entity-share-wrapper .share-btn-qq').each(this.setupQQShareBtn.bind(this));

             $('.entity-share-wrapper .list-item-weixin').each(this.setupWeixinShareBtn.bind(this));
        },

        makeUrlQueryString : function(options){
            var paramList = [];
            for (var key in options){
                paramList.push(key+'='+encodeURIComponent(options[key]));
            }
            return  '?' + paramList.join('&');
        },

        setupWeiboShareBtn: function(index,ele){
            var options = _.clone(this.weiboShareOptions);
                options.title = this.getShareTitle(ele);
                options.pic = this.getSharePic(ele);

                ele.href = this.weibo_share_service_url + this.makeUrlQueryString(options);
        },

        setupQQShareBtn: function(index,ele){
            var options = _.clone(this.qqShareOptions);
                options.showCount = 0;
                options.desc = this.getShareTitle(ele);
                options.summary = '#果库推荐商品';
                options.title =  this.shareTitle;
                options.site = '果库网';
                options.pics = this.getSharePic(ele);

                ele.href = this.qq_share_service_url + this.makeUrlQueryString(options);

        },

        setupWeixinShareBtn: function(index, ele){
                $(ele).click(this.showWeixinShareDialog.bind(this));
        },

        getShareTitle: function(ele){
            var entity_brand = $(ele).attr('data_entity_brand');
            var entity_title = $(ele).attr('data_entity_title');
            var entity_comment = $(ele).attr('data_entity_comment');
            var title = entity_brand + ' ' + entity_title + ' ：'
                        + entity_comment;

            return title ;
        },
        getSharePic: function(ele){

            return $(ele).attr('data_entity_pics');
        }

    });

    return EntityShareApp;
});