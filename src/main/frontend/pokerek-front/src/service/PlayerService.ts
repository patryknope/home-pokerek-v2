import {
    DELETE,
    GET,
    performRequestWithNoResponse,
    performRequestWithTypedResponse,
    POST,
    PUT
} from "./api/ApiService";
import {
    Player,
    PlayerResponse,
    CreatePlayerRequest,
    UpdatePlayerRequest
} from "../data/Player";
export class PlayerService {
    static getPlayers(): Promise<Player[]> {
        return performRequestWithTypedResponse<Player[]>(
            GET,
            "/localhost:8080/players",
            undefined,
            undefined
        ).then((response) => response.map((response) => new Player(response))
        );
    }
    static getPlayerById(id: string): Promise<Player> {
        return performRequestWithTypedResponse<PlayerResponse>(
            GET,
            `/localhost:8080/players/${id}`,
            undefined,
            undefined
        ).then((response) => new Player(response))
    }
    static addPlayer(request: CreatePlayerRequest) {
        return performRequestWithTypedResponse<PlayerResponse>(
            POST,
            "localhost:8080/players",
            JSON.stringify(request)
        );
    }
    static updatePlayer(request: UpdatePlayerRequest) {
        const playerId = request.id;
        return performRequestWithTypedResponse<PlayerResponse>(
            PUT,
            `/players/${playerId}`,
            JSON.stringify(request)
        )
    }
    static deletePlayerById(id: string): Promise<void> {
        return performRequestWithNoResponse(
            DELETE,
            `localhost:8080/players/${id}`
        )
    }
}