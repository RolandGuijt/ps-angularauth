using Duende.Bff;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using System.Net.Http.Headers;

public class GloboUserService(IOptions<BffOptions> options, ILoggerFactory loggerFactory, 
  IHttpClientFactory httpClientFactory, IHttpContextAccessor httpContextAccessor): 
  DefaultUserService(options, loggerFactory) {
    private readonly IHttpClientFactory httpClientFactory = httpClientFactory;
    private readonly IHttpContextAccessor httpContextAccessor = httpContextAccessor;

  private async Task<ClaimRecord[]> GetAuthzData()
  {
    var token = await httpContextAccessor.HttpContext.GetTokenAsync("access_token");
    var http = httpClientFactory.CreateClient();
    http.BaseAddress = new Uri("https://localhost:7280");
    http.DefaultRequestHeaders.Authorization = 
      new AuthenticationHeaderValue("Bearer", token);
    var result = await http.GetAsync("/user/authzdata/1");
    result.EnsureSuccessStatusCode();
    return await result.Content.ReadFromJsonAsync<ClaimRecord[]>();
  }

  protected override IEnumerable<ClaimRecord> GetUserClaims(
    AuthenticateResult authenticateResult)
  {
    var baseClaims = base.GetUserClaims(authenticateResult);
    var extraClaims = GetAuthzData().GetAwaiter().GetResult();

    return baseClaims.Concat(extraClaims);
  }
}