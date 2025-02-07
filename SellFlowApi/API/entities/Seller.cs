using System;
using Microsoft.AspNetCore.Identity;

namespace API.Entities;

public class Seller : AppUser
{
    public List<Product>? ListOfProducts{get;set;}
}