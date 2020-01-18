export class Endpoints{
    public static Profile = '/api/profile';
    public static Character = '/api/character';
    public static Resources = '/api/resources';
    public static PublicResources = '/api/publicResources';
    public static Users = '/api/Users/';
    public static User = (id) => `/api/User/${id}`;
    public static Application = '/api/application';
    public static Events = '/api/event';
}