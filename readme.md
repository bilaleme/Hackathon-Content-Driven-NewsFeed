This is the demonstration for content driven news feed application. So we have built a text editor just like normal text editors like google docs. So the cool part is when the content in the editor is changed. The news feed from all the famous knowledge sources is fetched and displayed to the user asynchronously.

For that we have built a middleware consisting of webservices for each of the different call to knowledge sources plus the cosine similarity algorithm service that is being developed and exposed via python platform.

So basically we scrap these knowledge websites through simple get requests and parse the html returned into the useful information we need. we didn't use APIs from these knowledge sources as their accuracy is limited.

Firstly we pass the information to textrazor, an online cloud based api that returns the possible topics of the text under processing which are then queried to the knowledge source websites to get useful articles, results.

We get newsfeed results from all the knowledge sources and save them to firebase database. From where we rank these results based upon the similarity score obtained from cosine similarity algorithm implementation from python service locally and show the ranked results to the user.