using API_Server.Data;
using API_Server.Models;
using EshopIdentity.Models;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Authentication.Cookies;
using Newtonsoft.Json;
using System.Net;
using API_Server.Services;

namespace EshopIdentity.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly API_ServerContext _context;
        private readonly IUserService _userService;
        public UsersController(UserManager<User> userManager, IUserService userService, RoleManager<IdentityRole> roleManager, IConfiguration configuration, API_ServerContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _context = context;
            _userService = userService;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            return await _context.User.ToListAsync();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(string id)
        {
            var user = await _context.User.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/User/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(string id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            user.Status = true;
            _context.User.Update(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(string id)
        {
            return _context.User.Any(e => e.Id == id);
        }


        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            user.Status = false;
            _context.User.Update(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([Bind("Username,Password")] LoginModel account)
        {
            var user = await _userManager.FindByNameAsync(account.Username);
            if (user != null && await _userManager.CheckPasswordAsync(user, account.Password))
            {
                var userRoles = await _userManager.GetRolesAsync(user);
                var userId = await _userManager.GetUserIdAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddHours(3),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo,
                    userRole = userRoles,
                    userId = userId
                });
            }
            return Unauthorized();
        }
        [HttpPost("google")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginModel model)
        {
            var client = new HttpClient();
            var response = await client.GetAsync($"https://oauth2.googleapis.com/tokeninfo?id_token={model.TokenId}");

            if (!response.IsSuccessStatusCode)
            {
                return BadRequest("Invalid Google token.");
            }

            var googleInfo = JsonConvert.DeserializeObject<GoogleTokenInfo>(await response.Content.ReadAsStringAsync());

            // Lấy người dùng từ cơ sở dữ liệu
            var user = await _userManager.FindByEmailAsync(googleInfo.Email);

            // Nếu người dùng không tồn tại, tạo một người dùng mới
            if (user == null)
            {
                return Unauthorized();
            }

            var userId = await _userManager.GetUserIdAsync(user);

            // Tạo JWT
            var authClaims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, user.UserName),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo,
                userId = userId
            });
        }

        [HttpPost("google/register")]
        public async Task<IActionResult> GoogleRegister([FromBody] GoogleLoginModel model)
        {
            var client = new HttpClient();
            var response = await client.GetAsync($"https://oauth2.googleapis.com/tokeninfo?id_token={model.TokenId}");

            if (!response.IsSuccessStatusCode)
            {
                return BadRequest("Invalid Google token.");
            }

            var googleInfo = JsonConvert.DeserializeObject<GoogleTokenInfo>(await response.Content.ReadAsStringAsync());

            var result = await RegisterUserIfNotExists(googleInfo.Email, googleInfo.Name);

            if (!result.Succeeded)
            {
                return BadRequest("Failed to create user.");
            }

            // Lấy thông tin người dùng từ cơ sở dữ liệu sau khi đã tạo hoặc đã tồn tại
            var user = await _userManager.FindByEmailAsync(googleInfo.Email);
            var userId = await _userManager.GetUserIdAsync(user);

            // Tạo JWT
            var authClaims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, user.UserName),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo,
                userId = userId
            });
        }
        private async Task<IdentityResult> RegisterUserIfNotExists(string email, string fullName)
{
    var user = await _userManager.FindByEmailAsync(email);

    if (user == null)
    {
        user = new User
        {
            UserName = email,
            Email = email,
            FullName = fullName
        };

        var result = await _userManager.CreateAsync(user);

        if (result.Succeeded)
        {
            // Thêm quyền mặc định cho người dùng mới nếu cần thiết
            if (await _roleManager.RoleExistsAsync("User"))
            {
                await _userManager.AddToRoleAsync(user, "User");
            }
        }

        return result;
    }

    // Trả về Success nếu người dùng đã tồn tại
    return IdentityResult.Success;
}
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(Register register)
        {
            if (register.Password != register.Repassword)
            {
                return new BadRequestObjectResult("Password must be matched with Repassword!");
            }
            var userExist = await _userManager.FindByNameAsync(register.Username);
            if (userExist != null)
            {
                var errorResponse = new { Message = "User already exists" };
                return new BadRequestObjectResult(errorResponse);
            }
            User user = new User()
            {
                UserName = register.Username,
                SecurityStamp = Guid.NewGuid().ToString(),
                Email = register.Email
            };
            var result = await _userManager.CreateAsync(user, register.Password);
            if (!result.Succeeded)
            {
                var errorResponse = new { Message = "Something went wrong!" };
                return new BadRequestObjectResult(errorResponse);
            }
            if (await _roleManager.RoleExistsAsync("User"))
            {
                await _userManager.AddToRoleAsync(user, "User");
            }
            return new OkResult();

        }

        [HttpPost]
        [Route("register-admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterAdmin registerAdmin)
        {
            var userExists = await _userManager.FindByNameAsync(registerAdmin.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError);

            User user = new User()
            {
                Email = registerAdmin.Email,
                Phone = registerAdmin.Phone,
                FullName = registerAdmin.FullName,
                Address = registerAdmin.Address,
                Status = registerAdmin.Status,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = registerAdmin.Username
            };
            var result = await _userManager.CreateAsync(user, registerAdmin.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError);

            if (!await _roleManager.RoleExistsAsync("Admin"))
                await _roleManager.CreateAsync(new IdentityRole("Admin"));
            if (!await _roleManager.RoleExistsAsync("User"))
                await _roleManager.CreateAsync(new IdentityRole("User"));

            if (await _roleManager.RoleExistsAsync("Admin"))
            {
                await _userManager.AddToRoleAsync(user, "Admin");
            }

            return Ok();
        }
        [HttpPut("ChangePassword")]
        public async Task<IActionResult> ChangePassword(ChangePasswordModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByIdAsync(model.UserId);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok("Password changed successfully");
        }
        [HttpPut("ChangeInfoUser")]
        public async Task<IActionResult> ChangeInfoUser(ChangeInfoUser model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByIdAsync(model.UserId);
            if (user == null)
            {
                return NotFound("User not found");
            }

            user.FullName = model.FullName;
            user.Phone = model.Phone;
            user.Address = model.Address;
            user.Email = model.Email;
            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok("User information updated successfully");
        }
    }
}
