using Persistence;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Activities;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        // private readonly IMediator _mediator;

        // // private readonly DataContext _context;
        // public ActivitiesController(IMediator mediator)
        // {
        //     _mediator = mediator;
        //     // _context = context;            
        // }
        [HttpGet] //apt/activites
        public async Task<ActionResult<List<Activity>>> GetActivities(CancellationToken ct){
            return await Mediator.Send(new List.Query(), ct);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id){
            // return Ok();
            return await Mediator.Send(new Details.Query{Id = id});
            // return await _context.Activities.FindAsync(id);
        }
        [HttpPost]
        public async Task<IActionResult> CreateActivity([FromBody]Activity activity){
            return Ok(await Mediator.Send(new Create.Command {Activity = activity}));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity){
            activity.Id = id;
            return Ok(await Mediator.Send(new Edit.Command {Activity=activity}));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id){
            return Ok(await Mediator.Send(new Delete.Command {Id = id}));
        }
    }
}