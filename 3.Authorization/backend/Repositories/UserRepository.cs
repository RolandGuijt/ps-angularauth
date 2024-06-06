using Globomantics.Backend.Models;

namespace Globomantics.Backend.Repositories;

public class UserRepository
{
    private List<UserModel> users = new()
    {
        new UserModel { Id = 3522, Name = "Roland", Password = "K7gNU3sdo+OL0wNhqoVWhr3g6s1xYv72ol/pe/Unols=",
            FavoriteColor = "blue", Role = "Admin" }
    };

    private List<UserAuthZ> userAuthZs =
    [
        new UserAuthZ { UserId = "3522", Type = "department", Value = "HR" }
    ];

    public IEnumerable<UserAuthZ> GetAuthzData(string userId)
    {
        return userAuthZs
            .Where(us => us.UserId == userId);
    }

    public UserModel GetByUsernameAndPassword(string username, string password)
    {
        var user = users.SingleOrDefault(u => u.Name.ToLower() == username.ToLower() && u.Password == password.Sha256());
        return user;
    }
}
