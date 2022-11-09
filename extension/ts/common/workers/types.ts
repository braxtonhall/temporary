import {GetParameters, GetResponse} from "../../background/workers/request";
import {
	AuthorizeParameters,
	AuthorizeResponse,
	DeAuthorizeParameters,
	DeAuthorizeResponse,
} from "../../background/workers/authorize";
import {Message} from "../types";

enum WorkerKind {
	Get = "get",
	Authorize = "authorize",
	DeAuthorize = "deauthorize",
}

enum WorkerStatus {
	RESOLVED,
	REJECTED,
}

enum WorkerErrorKind {
	UnsupportedBrowser = "unsupported",
	Unknown = "unknown",
}

class WorkerError extends Error {
	constructor(public kind: WorkerErrorKind, message?: string) {
		super(message);
	}
}

type WorkerRequest<Kind extends WorkerKind> = Kind extends WorkerKind.Get
	? GetParameters
	: Kind extends WorkerKind.Authorize
	? AuthorizeParameters
	: Kind extends WorkerKind.DeAuthorize
	? DeAuthorizeParameters
	: never;

interface TypedWorkerRequest<Kind extends WorkerKind> extends Message {
	kind: WorkerKind;
	request: WorkerRequest<Kind>;
	message: "worker-message";
}

type WorkerResponse<Kind extends WorkerKind> = WorkerResponseResolved<Kind> | WorkerResponseRejected;

type WorkerResponseResolved<Kind extends WorkerKind> = {
	status: WorkerStatus.RESOLVED;
	value: WorkerResponseValue<Kind>;
};
type WorkerResponseRejected = {status: WorkerStatus.REJECTED; error: WorkerErrorKind; message: string};

type WorkerResponseValue<Kind extends WorkerKind> = Kind extends WorkerKind.Get
	? GetResponse
	: Kind extends WorkerKind.Authorize
	? AuthorizeResponse
	: Kind extends WorkerKind.DeAuthorize
	? DeAuthorizeResponse
	: never;

type Worker<Kind extends WorkerKind> = (request: WorkerRequest<Kind>) => Promise<WorkerResponseValue<Kind>>;

type Workers = {
	[Kind in WorkerKind]: Worker<Kind>;
};

export {
	WorkerKind,
	Worker,
	Workers,
	WorkerRequest,
	WorkerResponse,
	WorkerResponseValue,
	TypedWorkerRequest,
	WorkerStatus,
	WorkerError,
	WorkerErrorKind,
};
