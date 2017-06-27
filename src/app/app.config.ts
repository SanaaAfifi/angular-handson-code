export class AppConfig {
    //49521ng 
     public readonly apiUrl =  'http://jokes.apphb.com';//'http://localhost:55628';
     public readonly JokesServiceUrl = this.apiUrl+ '/api/PostedJokes';
     public readonly AccountServiceUrl = this.apiUrl+'/api/Account'
    public readonly TokenKey = 'currentUser';
   public readonly Accesstoken = 'access_token';
    public readonly Expiresin ='expires_in';
 public readonly TokenType ='token_type';
  public readonly UserName ='userName';
};