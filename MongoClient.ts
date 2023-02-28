type IMongoClient = {
  insertOne: ({
    document,
    collection,
  }: {
    document: Record<string, unknown>;
    collection: string;
  }) => Promise<void>;
};

export class MongoClient implements IMongoClient {
  private ENDPOINT: string;
  private DATABASE: string;
  private dataSource: string;
  private _fetch: (
    input: string | URL | Request,
    init?: RequestInit | undefined,
  ) => Promise<Response>;
  constructor(
    DATA_API_KEY: string,
    APP_ID: string,
    DATABASE: string,
    dataSource: string,
  ) {
    this.ENDPOINT =
      `https://ap-southeast-1.aws.data.mongodb-api.com/app/${APP_ID}/endpoint/data/v1/action`;
    this.DATABASE = DATABASE;
    this.dataSource = dataSource;
    this._fetch = (
      path: string | URL | Request,
      init?: RequestInit | undefined,
    ) => {
      return fetch(`${this.ENDPOINT}${path}`, {
        headers: {
          "Content-Type": "application/json",
          "api-key": DATA_API_KEY,
        },
        ...init,
      });
    };
  }
  insertOne = async ({
    document,
    collection,
  }: {
    document: Record<string, unknown>;
    collection: string;
  }) => {
    try {
      await this._fetch("/insertOne", {
        body: JSON.stringify({
          document,
          collection,
          database: this.DATABASE,
          dataSource: this.dataSource,
        }),
        method:"POST"
      });
    } catch (e) {
      console.error(e);
    }
  };
}
