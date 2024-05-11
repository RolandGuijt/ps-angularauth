using Globomantics.Backend.Models;
using Globomantics.Backend.Repositories;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSpaYarp();
builder.Services.AddAuthorization();
builder.Services.AddSingleton<HouseRepository>();
builder.Services.AddSingleton<BidRepository>();

builder.Services.AddBff(o => o.ManagementBasePath = "/account")
    .AddServerSideSessions();

builder.Services.AddAuthentication(o =>
    {
        o.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        o.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
    })
    .AddCookie(o =>
    {
        o.Cookie.Name = "__Host-spa";
        o.Cookie.SameSite = SameSiteMode.Strict;
        o.Events.OnRedirectToLogin = (context) =>
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        };
    })
    .AddOpenIdConnect(options =>
    {
        options.Authority = "https://dev-o4sbhki3eu8gdt3h.us.auth0.com";

        options.ClientId = "NMOTb2wic4ikPaLIHgnSAjTIvuQgW64y";
        //Store in application secrets
        options.ClientSecret = "GHzsCmGBlRG4WTVdQl5gUZAu-aWX7cdWtxvCaNq4SCXnPuivMAR7rCmLH3iY1L-6";
        options.ResponseType = "code";
    });

var app = builder.Build();

app.UseBff();

app.MapGet("/houses", [Authorize](HouseRepository repo) => repo.GetAll());
app.MapGet("/houses/{id:int}", [Authorize](int id, HouseRepository repo) => repo.GetHouse(id));
app.MapPost("/houses", [Authorize](House house, HouseRepository repo) =>
{
    repo.Add(house);
    return Results.Created($"/houses/{house.Id}", house);
});

app.MapGet("/houses/{id:int}/bids", [Authorize] (int id, BidRepository repo) => repo.GetBids(id));
app.MapPost("houses/{id:int}/bids", [Authorize] (Bid bid, BidRepository repo) =>
{
    repo.Add(bid);
    return Results.Created($"/houses/{bid.HouseId}/bids", bid);
});

app.UseAuthorization();

app.MapBffManagementEndpoints();
app.UseSpaYarp();

app.Run();