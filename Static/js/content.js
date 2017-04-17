/**
 * Created by Administrator on 4/16/2017.
 */
urlParent = 'http://127.0.0.1:1880/';
$(document).ready(function(){
    // fbdb.ref('/').set(null);
});

angular.module('ContentApp',[])
    .controller('LeftSideController',function($scope){

        $scope.checkCosine = function(str1, str2){
            cosineValue = 0;
            $.ajax({
                url: urlParent + "cosine",
                data:{
                    text:str1,
                    tokens: str2
                },
                method:'POST',
                async: false,
                success:function(data){

                   cosineValue = parseFloat(data);
                }
            });

            return cosineValue;
        }

        $scope.rankedList = function(unsortedList){

            for(x=0;x<unsortedList.length;x++){
                for(y=1;y<unsortedList.length ;y++){
                    if(unsortedList[y].cos > unsortedList[y-1].cos){
                        mtemp = unsortedList[y-1];
                        unsortedList[y-1] = unsortedList[y];
                        unsortedList[y] = mtemp;
                    }
                }
            }
            console.log(unsortedList);

        }

        $scope.populate = function(){
            //Google part

            fbdb.ref('/topics/google/').on('value',function(snapshot){
                topics = snapshot.val();
                $scope.googleList = [];
                topicsString = "";
                for (x in topics){
                    mtopic = topics[x];
                    topicsString += x + " ";
                    for (y in mtopic){
                        mtopic[y].desc = mtopic[y].desc.substring(0, 50);
                        // $scope.googleList.push(mtopic[y]);
                        // console.log(mtopic[y]);
                    }
                }

                topicsObject = [];
                for(x in topics){
                    mtopics = topics[x];
                    for(y in mtopics){
                        var temp = $scope.checkCosine(topicsString,mtopics[y].desc);
                        topicsObject.push({cos:temp,mobj:mtopics[y]});
                    }
                }

                $scope.rankedList(topicsObject);
                // console.log(topicsObject);
                enCount = 0;
                for(x in topicsObject){
                    $scope.googleList.push((topicsObject[x].mobj));
                    enCount++;

                    if(enCount == 5) break;
                }

                $scope.$evalAsync();
            });

            //Wikipedia part
            fbdb.ref('/topics/wiki/').on('value',function(snapshot){
                topics = snapshot.val();
                $scope.wikiList = [];
                topicsString = "";
                for (x in topics){
                    mtopic = topics[x];
                    topicsString += x + " ";
                    for (y in mtopic){
                        // $scope.wikiList.push(mtopic[y]);
                        // console.log(mtopic[y]);
                    }
                }



                topicsObject = [];
                for(x in topics){
                    mtopics = topics[x];
                    for(y in mtopics){
                        var temp = $scope.checkCosine(topicsString,mtopics[y].url);
                        topicsObject.push({cos:temp,mobj:mtopics[y]});
                    }
                }

                $scope.rankedList(topicsObject);
                // console.log(topicsObject);
                enCount = 0;
                for(x in topicsObject){
                    $scope.wikiList.push((topicsObject[x].mobj));
                    enCount++;

                    if(enCount == 5) break;
                }

                $scope.wikiList;
                $scope.$evalAsync();
            });

            //Bing part
            fbdb.ref('/topics/bing/').on('value',function(snapshot){
                topics = snapshot.val();
                $scope.bingList = [];
                topicsString = "";
                for (x in topics){
                    mtopic = topics[x];
                    topicsString += x + " ";
                    for (y in mtopic){
                        mtopic[y].desc = mtopic[y].desc.substring(0, 50);
                        // $scope.bingList.push(mtopic[y]);
                        // console.log(mtopic[y]);
                    }
                }

                topicsObject = [];
                for(x in topics){
                    mtopics = topics[x];
                    for(y in mtopics){
                        var temp = $scope.checkCosine(topicsString,mtopics[y].url);
                        topicsObject.push({cos:temp,mobj:mtopics[y]});
                    }
                }

                $scope.rankedList(topicsObject);
                // console.log(topicsObject);
                enCount = 0;
                for(x in topicsObject){
                    $scope.bingList.push((topicsObject[x].mobj));
                    enCount++;

                    if(enCount == 5) break;
                }

                $scope.bingList;
                $scope.$evalAsync();
            });



            //Youtube part
            fbdb.ref('/topics/youtube/').on('value',function(snapshot){
                topics = snapshot.val();
                $scope.youList = [];
                topicsString = "";
                for (x in topics){
                    mtopic = topics[x];
                    topicsString += x + " ";
                    for (y in mtopic){
                        mtopic[y].desc = mtopic[y].desc.substring(0, 50);
                        // $scope.youList.push(mtopic[y]);
                        // console.log(mtopic[y]);
                    }
                }

                topicsObject = [];
                for(x in topics){
                    mtopics = topics[x];
                    for(y in mtopics){
                        var temp = $scope.checkCosine(topicsString,mtopics[y].desc);
                        topicsObject.push({cos:temp,mobj:mtopics[y]});
                    }
                }

                $scope.rankedList(topicsObject);
                // console.log(topicsObject);
                enCount = 0;
                for(x in topicsObject){
                    $scope.youList.push((topicsObject[x].mobj));
                    enCount++;

                    if(enCount == 5) break;
                }

                $scope.youList;
                $scope.$evalAsync();
            });
        };

        $scope.callYouTube = function(ptopic){
            $.ajax({
                url: urlParent + "youtube",
                data:{
                    topic:ptopic,
                },
                method:'POST',
                async: true,
                success:function(data){
                    var pdata = JSON.parse(data);

                    count = 0;
                    for(x in pdata){
                        count++;
                        // console.log(pdata.length);
                            linkTag = $(pdata[x]).children().find('.yt-uix-tile-link');

                        // console.log(linkTag[0].outerText);
                        mdesc = linkTag[0].outerText;
                        // console.log("https://www.youtube.com/"+$(pdata[x]).children().find('.yt-uix-tile-link').attr('href'));
                        murl = "https://www.youtube.com/"+$(pdata[x]).children().find('.yt-uix-tile-link').attr('href')
                        // console.log($(pdata[x]).children().find('.yt-thumb-simple img').attr('src'));
                        imgUrl = $(pdata[x]).children().find('.yt-thumb-simple img').attr('src');


                        fbdb.ref('/topics/youtube/'+ptopic.replace(' ','_')).once('value',function(snapshot){
                            if(snapshot.val() != null){

                            } else {

                                fbdb.ref('/topics/youtube/'+ptopic.replace(' ','_')).push({
                                    "url": murl,
                                    "desc":mdesc,
                                    "image":imgUrl,
                                });
                            }
                        });


                        if(count == 5 ) break;
                    }
                }
            });
        };

        $scope.callGoogle = function(ptopic){
            $.ajax({
                url: urlParent + "google",
                data:{
                    topic:ptopic,
                },
                method:'POST',
                async: true,
                success:function(data){
                    var pdata = JSON.parse(data);

                    count = 0;
                    for(x in pdata){
                        count++;
                        linkTag = $(pdata[x]);

                        citeDesc = $('<div>').appendTo('body').hide().append($(linkTag[0])).text();

                        citeTag = $(linkTag[1]).find('cite');
                        citeLinks = $('<div>').append(citeTag[0]).appendTo('body').hide().find('cite').text();

                        // console.log(citeDesc);


                        fbdb.ref('/topics/google/'+ptopic.replace(' ','_')).once('value',function(snapshot){
                            if(snapshot.val() != null){

                            } else {

                                fbdb.ref('/topics/google/'+ptopic.replace(' ','_')).push({
                                    "url": citeLinks,
                                    "desc":citeDesc
                                });
                            }
                        });

                        if(count == 5) break;

                    }
                }
            });
        };

        $scope.callBing = function(ptopic){
            $.ajax({
                url: urlParent + "bing",
                data:{
                    topic:ptopic,
                },
                method:'POST',
                async: true,
                success:function(data){
                    var pdata = JSON.parse(data);

                    count = 0;
                    for(x in pdata){
                        count++;
                        linkTag = $(pdata[x]);

                        citeDesc = $('<div>').appendTo('body').hide().append($(linkTag[0])).text();

                        citeTag = $(linkTag[1]).find('cite');
                        citeLinks = $('<div>').append(citeTag[0]).appendTo('body').hide().find('cite').text();

                        // console.log(citeLinks);

                        fbdb.ref('/topics/bing/'+ptopic.replace(' ','_')).once('value',function(snapshot){
                            if(snapshot.val() != null){

                            } else {

                                fbdb.ref('/topics/bing/'+ptopic.replace(' ','_')).push({
                                    "url": citeLinks,
                                    "desc":citeDesc
                                });
                            }
                        });

                        if(count == 5) break;
                    }
                }
            });
        };

        $scope.callWiki = function(ptopic) {
            $.ajax({
                url: urlParent + "wiki",
                data: {
                    topic: ptopic.replace(' ','_'),
                },
                method: 'POST',
                async: true,
                success: function (data) {

                    fbdb.ref('/topics/wiki/'+ptopic.replace(' ','_')).once('value',function(snapshot){
                        if(snapshot.val() != null){

                        } else {

                            fbdb.ref('/topics/wiki/'+ptopic.replace(' ','_')).push({
                                "url": data
                            });
                        }
                    });

                }
            });
        };

        $scope.getTopics = function(){



            pbody = $('#editor')[0].innerText;
            contentText = pbody;

            $.ajax({
                url: urlParent + "topika",
                data:{
                    text:pbody,
                    extractors:"topics"
                },
                method:'POST',
                async: true,
                success:function(data){

                    topics = data['topics'];

                    for ( x in topics){
                        $scope.callYouTube(topics[x].label);
                        $scope.callWiki(topics[x].label);
                        $scope.callGoogle(topics[x].label);
                        $scope.callBing(topics[x].label);
                    }
                }
            });
        };


        $scope.getTopics();

        $scope.populate();
        // $('#editor').on('keypress',function(e){
        //     console.log('keypresseed');$scope.getTopics();
        // });
        // var ccc = $scope.checkCosine("This is bilal ahmad pakistan", "pakistan india bangladesh");
        // console.log(ccc);
        // $scope.callWiki("Differential Equations");
        // $scope.render();
        // $scope.callYouTube("Differential Equations");
        // $scope.getTopics();
    });



