using Library.Debugging;

namespace Library
{
    public class LibraryConsts
    {
        public const string LocalizationSourceName = "Library";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "30fdffa5f5fc4b9993f1da4875998f2a";
    }
}
