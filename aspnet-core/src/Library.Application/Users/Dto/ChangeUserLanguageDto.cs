using System.ComponentModel.DataAnnotations;

namespace Library.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}