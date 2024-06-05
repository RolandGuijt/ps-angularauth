namespace Globomantics.Backend.Repositories;

public class UserRepository
{
    private List<UserAuthZ> userAuthZs =
    [
        new UserAuthZ { ApplicationId = 1, UserId = "1", Type = "department", 
            Value = "HR" },
        new UserAuthZ { ApplicationId = 1, UserId = "2", Type = "department", 
            Value = "Sales" }
    ];

    public IEnumerable<UserAuthZ> GetAuthzData(int applicationId, string userId)
    {
        return userAuthZs
            .Where(us => us.UserId == userId && us.ApplicationId == applicationId);
    }
}
