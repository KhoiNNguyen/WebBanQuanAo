namespace API_Server.Models
{
    public class RegisterAdmin
    {
        public string Username { get; set; }

        public string Password { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public bool Status { get; set; }
    }
}
