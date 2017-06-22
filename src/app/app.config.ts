export class AppConfig {
    //49521ng 
     public readonly apiUrl = 'http://localhost:55628/';// 'http://jokes.apphb.com';
     public readonly JokesServiceUrl = this.apiUrl+ '/api/PostedJokes';
     public readonly AccountServiceUrl = this.apiUrl+'/api/Account';
    public readonly TokenKey = 'currentUser';
   public readonly Accesstoken = 'access_token';
    public readonly Expiresin ='expires_in';
 public readonly TokenType ='token_type';
  public readonly UserName ='userName';
};