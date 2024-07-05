using API_Server.Data;
using API_Server.Models;
using Microsoft.EntityFrameworkCore;

namespace API_Server.Services
{
    public interface IUserService
    {
        Task SaveUserAsync(Dictionary<string, string> userInfo);
    }

    public class UserService : IUserService
    {
        private readonly API_ServerContext _context;

        public UserService(API_ServerContext context)
        {
            _context = context;
        }

        public async Task SaveUserAsync(Dictionary<string, string> userInfo)
        {
            var email = userInfo.GetValueOrDefault("email");
            if (string.IsNullOrEmpty(email))
            {
                throw new ArgumentException("Email is required to save user.");
            }

            var user = new User
            {
                FullName = userInfo.GetValueOrDefault("name"),
                Email = email,
            };

            // Kiểm tra xem người dùng đã tồn tại chưa
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
            if (existingUser == null)
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            }
        }
    }
}
