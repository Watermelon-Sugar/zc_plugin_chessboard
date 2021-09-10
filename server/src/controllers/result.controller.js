// Custom Modules
const response = require("../utils/response");
const CustomError = require("../utils/custom-error");
const DatabaseConnection = require("../db/database.helper");
const GameRepo = new DatabaseConnection("001test_game");

class ResultController {
  // Get All Results
  async getAll(req, res) {
    req;
    const games = await GameRepo.fetchAll();

    try {
      let resultsDBData = games.map((game) => {
        return {
          // eslint-disable-next-line no-constant-condition
          result: (game.is_owner_winner = null ? "Draw" : "Win"),
          winner: game.is_owner_winner ? game.winner : game.opponent,
          game_id: game._id,
        };
      });

      res
        .status(200)
        .send(response("Results retrieved successfully", resultsDBData));
    } catch (error) {
      throw new CustomError(`Unable to get all Results: ${error}`, 500);
    }
  }
  // Get A Result
  // async getById(req, res) {
  // }
}

// Export Module
module.exports = new ResultController();
