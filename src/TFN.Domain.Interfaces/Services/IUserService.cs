﻿using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using TFN.Domain.Interfaces.Repositories;
using TFN.Domain.Models.Entities;

namespace TFN.Domain.Interfaces.Services
{
    public interface IUserService : IUserRepository
    {  
        Task<User> AutoProvisionUserAsync(string provider, string userId, List<Claim> claims);
        Task<bool> ValidateCredentialsAsync(string username, string password);
        bool ValidateUsernameCharacterSafety(string password);
        Task<User> FindByExternalProviderAsync(string provider, string userId);
        Task<bool> ExistsByEmail(string email);
        Task<bool> ExistsByUsername(string username);
        Task CreateAsync(User user, string password);
        IEnumerable<Claim> GetClaims(User user);
    }
}
