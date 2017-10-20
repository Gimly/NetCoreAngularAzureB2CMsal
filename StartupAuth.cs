using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace msal_netcore_angular
{
    public class StartupAuth
    {
        const string metaDataAddressFormatter = "https://login.microsoftonline.com/{0}/v2.0/.well-known/openid-configuration?p={1}";
        const string tenantFormatter = "{0}.onmicrosoft.com";

        internal static void ConfigureServices(IServiceCollection services, IConfiguration configuration, IHostingEnvironment environment)
        {
            var myPolicy = configuration["Jwt:Policy"];
            var myTenant = string.Format(tenantFormatter, configuration["Jwt:Tenant"]);

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(o =>
            {
                o.MetadataAddress = string.Format(metaDataAddressFormatter, myTenant, myPolicy);
                o.Audience = configuration["Jwt:Audience"];
                o.RequireHttpsMetadata = false; //TODO remove this in production
                o.Events = new JwtBearerEvents()
                {
                    OnAuthenticationFailed = c =>
                    {
                        c.NoResult();

                        c.Response.StatusCode = 500;
                        c.Response.ContentType = "text/plain";
                        if (environment.IsDevelopment())
                        {
                            return c.Response.WriteAsync(c.Exception.ToString());
                        }
                        return c.Response.WriteAsync("An error occured processing your authentication.");
                    }
                };
            });
        }
    }
}
