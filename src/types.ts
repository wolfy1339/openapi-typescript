import type { URL } from "url";

export interface OpenAPI2 {
  swagger: string; // required
  paths?: Record<string, PathItemObject>;
  definitions?: Record<string, SchemaObject>;
  parameters?: ParameterObject[];
  responses?: Record<string, ResponseObject>; // required
}

/**
 * [4.8] Schema
 * @see https://spec.openapis.org/oas/v3.1.0#schema
 */
export interface OpenAPI3 {
  /** REQUIRED. This string MUST be the version number of the OpenAPI Specification that the OpenAPI document uses. The openapi field SHOULD be used by tooling to interpret the OpenAPI document. This is not related to the API info.version string. */
  openapi: string;
  /** REQUIRED. Provides metadata about the API. The metadata MAY be used by tooling as required. */
  info: InfoObject; // required
  /** The default value for the $schema keyword within Schema Objects contained within this OAS document. This MUST be in the form of a URI. */
  jsonSchemaDialect?: string;
  /** An array of Server Objects, which provide connectivity information to a target server. If the servers property is not provided, or is an empty array, the default value would be a Server Object with a url value of /. */
  servers?: ServerObject[];
  /** The available paths and operations for the API. */
  paths?: PathsObject;
  /** The incoming webhooks that MAY be received as part of this API and that the API consumer MAY choose to implement. Closely related to the callbacks feature, this section describes requests initiated other than by an API call, for example by an out of band registration. The key name is a unique string to refer to each webhook, while the (optionally referenced) Path Item Object describes a request that may be initiated by the API provider and the expected responses. An example is available. */
  webhooks?: Record<string, PathItemObject | ReferenceObject>;
  /** An element to hold various schemas for the document. */
  components?: ComponentsObject;
  /** A declaration of which security mechanisms can be used across the API. The list of values includes alternative security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to authorize a request. Individual operations can override this definition. To make security optional, an empty security requirement ({}) can be included in the array. */
  security?: SecurityRequirementObject[];
  /** A list of tags used by the document with additional metadata. The order of the tags can be used to reflect on their order by the parsing tools. Not all tags that are used by the Operation Object must be declared. The tags that are not declared MAY be organized randomly or based on the tools’ logic. Each tag name in the list MUST be unique. */
  tags?: TagsObject[];
  /** Additional external documentation. */
  externalDocs?: ExternalDocumentationObject;
}

/**
 * [4.8.2] Info Object
 * The object provides metadata about the API.
 */
export interface InfoObject {
  /** REQUIRED. The title of the API. */
  title: string;
  /** A short summary of the API. */
  summary?: string;
  /** A description of the API. CommonMark syntax MAY be used for rich text representation. */
  description?: string;
  /** A URL to the Terms of Service for the API. This MUST be in the form of a URL. */
  termsOfService?: string;
  /** The contact information for the exposed API. */
  contact?: ContactObject;
  /** The license information for the exposed API. */
  license?: LicenseObject;
  /** REQUIRED. The version of the OpenAPI document (which is distinct from the OpenAPI Specification version or the API implementation version). */
  version: string;
}

/**
 * [4.8.3] Contact Object
 * Contact information for the exposed API.
 */
export interface ContactObject {
  /** The identifying name of the contact person/organization. */
  name?: string;
  /** The URL pointing to the contact information. This MUST be in the form of a URL. */
  url?: string;
  /** The email address of the contact person/organization. This MUST be in the form of an email address. */
  email?: string;
}

/**
 * [4.8.4] License object
 * License information for the exposed API.
 */
export interface LicenseObject {
  /** REQUIRED. The license name used for the API. */
  name: string;
  /** An SPDX license expression for the API. The identifier field is mutually exclusive of the url field. */
  identifier: string;
  /** A URL to the license used for the API. This MUST be in the form of a URL. The url field is mutually exclusive of the identifier field. */
  url: string;
}

/**
 * [4.8.5] Server Object
 * An object representing a Server.
 */
export interface ServerObject {
  /** REQUIRED. A URL to the target host. This URL supports Server Variables and MAY be relative, to indicate that the host location is relative to the location where the OpenAPI document is being served. Variable substitutions will be made when a variable is named in {brackets}. */
  url: string;
  /** An optional string describing the host designated by the URL. CommonMark syntax MAY be used for rich text representation. */
  description: string;
  /** A map between a variable name and its value. The value is used for substitution in the server’s URL template. */
  variables: Record<string, ServerVariableObject>;
}

/**
 * [4.8.6] Server Variable Object
 * An object representing a Server Variable for server URL template substitution.
 */
export interface ServerVariableObject {
  /** An enumeration of string values to be used if the substitution options are from a limited set. The array MUST NOT be empty. */
  enum?: string[];
  /** REQUIRED. The default value to use for substitution, which SHALL be sent if an alternate value is not supplied. Note this behavior is different than the Schema Object’s treatment of default values, because in those cases parameter values are optional. If the enum is defined, the value MUST exist in the enum’s values. */
  default: string;
  /** An optional description for the server variable. CommonMark syntax MAY be used for rich text representation. */
  description?: string;
}

/**
 * [4.8.7] Components Object
 * Holds a set of reusable objects for different aspects of the OAS.
 */
export interface ComponentsObject {
  /** An object to hold reusable Schema Objects.*/
  schemas?: Record<string, SchemaObject>;
  /** An object to hold reusable Response Objects. */
  responses?: Record<string, ResponseObject | ReferenceObject>;
  /** An object to hold reusable Parameter Objects. */
  parameters?: Record<string, ParameterObject | ReferenceObject>;
  /** An object to hold reusable Example Objects. */
  examples?: Record<string, ExampleObject | ReferenceObject>;
  /** An object to hold reusable Request Body Objects. */
  requestBodies?: Record<string, RequestBodyObject | ReferenceObject>;
  /** An object to hold reusable Header Objects. */
  headers?: Record<string, HeaderObject | ReferenceObject>;
  /** An object to hold reusable Security Scheme Objects. */
  securitySchemes?: Record<string, SecuritySchemaObject | ReferenceObject>;
  /** An object to hold reusable Link Objects. */
  links?: Record<string, LinkObject | ReferenceObject>;
  /** An object to hold reusable Callback Objects. */
  callbacks?: Record<string, CallbackObject | ReferenceObject>;
  /** An object to hold reusable Path Item Object. */
  pathItems?: Record<string, PathItemObject | ReferenceObject>;
}

/**
 * [4.8.8] Paths Object
 * Holds the relative paths to the individual endpoints and their operations. The path is appended to the URL from the Server Object in order to construct the full URL. The Paths MAY be empty, due to Access Control List (ACL) constraints.
 */
export type PathsObject = { [pathname: string]: PathItemObject };

/**
 * [4.8.9] Path Item Object
 * Describes the operations available on a single path. A Path Item MAY be empty, due to ACL constraints. The path itself is still exposed to the documentation viewer but they will not know which operations and parameters are available.
 */
export interface PathItemObject {
  /** Allows for a referenced definition of this path item. The referenced structure MUST be in the form of a Path Item Object. In case a Path Item Object field appears both in the defined object and the referenced object, the behavior is undefined. See the rules for resolving Relative References. */
  $ref?: string;
  /** An optional, string summary, intended to apply to all operations in this path. */
  summary?: string;
  /** An optional, string description, intended to apply to all operations in this path. CommonMark syntax MAY be used for rich text representation. */
  description?: string;
  /** A definition of a GET operation on this path. */
  get?: OperationObject;
  /** A definition of a PUT operation on this path. */
  put?: OperationObject;
  /** A definition of a POST operation on this path. */
  post?: OperationObject;
  /** A definition of a DELETE operation on this path. */
  delete?: OperationObject;
  /** A definition of a OPTIONS operation on this path. */
  options?: OperationObject;
  /** A definition of a HEAD operation on this path. */
  head?: OperationObject;
  /** A definition of a PATCH operation on this path. */
  patch?: OperationObject;
  /** A definition of a TRACE operation on this path. */
  trace?: OperationObject; // V3 ONLY
  /** An alternative server array to service all operations in this path. */
  servers?: ServerObject[];
  /** A list of parameters that are applicable for all the operations described under this path. These parameters can be overridden at the operation level, but cannot be removed there. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a name and location. The list can use the Reference Object to link to parameters that are defined at the OpenAPI Object’s components/parameters. */
  parameters?: (ReferenceObject | ParameterObject)[];
}

/**
 * [4.8.10] Operation Object
 * Describes a single API operation on a path.
 */
export interface OperationObject {
  /** A list of tags for API documentation control. Tags can be used for logical grouping of operations by resources or any other qualifier. */
  tags?: string[];
  /** A short summary of what the operation does. */
  summary?: string;
  /** A verbose explanation of the operation behavior. CommonMark syntax MAY be used for rich text representation. */
  description?: string;
  /** Additional external documentation for this operation. */
  externalDocs?: ExternalDocumentationObject;
  /** Unique string used to identify the operation. The id MUST be unique among all operations described in the API. The operationId value is case-sensitive. Tools and libraries MAY use the operationId to uniquely identify an operation, therefore, it is RECOMMENDED to follow common programming naming conventions. */
  operationId?: string;
  /** A list of parameters that are applicable for this operation. If a parameter is already defined at the Path Item, the new definition will override it but can never remove it. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a name and location. The list can use the Reference Object to link to parameters that are defined at the OpenAPI Object’s components/parameters. */
  parameters?: (ReferenceObject | ParameterObject)[];
  /** The request body applicable for this operation. The requestBody is fully supported in HTTP methods where the HTTP 1.1 specification [RFC7231] has explicitly defined semantics for request bodies. In other cases where the HTTP spec is vague (such as GET, HEAD and DELETE), requestBody is permitted but does not have well-defined semantics and SHOULD be avoided if possible. */
  requestBody?: ReferenceObject | RequestBody;
  /** The list of possible responses as they are returned from executing this operation. */
  responses?: ResponsesObject;
  /** A map of possible out-of band callbacks related to the parent operation. The key is a unique identifier for the Callback Object. Each value in the map is a Callback Object that describes a request that may be initiated by the API provider and the expected responses. */
  callbacks?: Record<string, CallbackObject | ReferenceObject>;
  /** Declares this operation to be deprecated. Consumers SHOULD refrain from usage of the declared operation. Default value is false. */
  deprecated?: boolean;
  /** A declaration of which security mechanisms can be used for this operation. The list of values includes alternative security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to authorize a request. To make security optional, an empty security requirement ({}) can be included in the array. This definition overrides any declared top-level security. To remove a top-level security declaration, an empty array can be used. */
  security?: SecurityRequirementObject[];
  /** An alternative server array to service this operation. If an alternative server object is specified at the Path Item Object or Root level, it will be overridden by this value. */
  servers?: ServerObject[];
}

/**
 * [4.8.11] External Documentation Object
 * Allows referencing an external resource for extended documentation.
 */
export interface ExternalDocumentationObject {
  /** A description of the target documentation. CommonMark syntax MAY be used for rich text representation. */
  description?: string;
  /** REQUIRED. The URL for the target documentation. This MUST be in the form of a URL. */
  url: string;
}

/**
 * [4.8.12] Paramter Object
 * Describes a single operation parameter.
 * A unique parameter is defined by a combination of a name and location.
 */
export interface ParameterObject {
  /**
   * REQUIRED. The name of the parameter. Parameter names are case sensitive.
   *
   * If in is "path", the name field MUST correspond to a template expression occurring within the path field in the Paths Object. See Path Templating for further information.
   * If in is "header" and the name field is "Accept", "Content-Type" or "Authorization", the parameter definition SHALL be ignored.
   * For all other cases, the name corresponds to the parameter name used by the in property.
   */
  name: string;
  /** REQUIRED. The location of the parameter. Possible values are "query", "header", "path" or "cookie".*/
  in: string;
  /** A brief description of the parameter. This could contain examples of use. CommonMark syntax MAY be used for rich text representation. */
  description?: string;
  /** Determines whether this parameter is mandatory. If the parameter location is "path", this property is REQUIRED and its value MUST be true. Otherwise, the property MAY be included and its default value is false. */
  required?: boolean;
  /** Specifies that a parameter is deprecated and SHOULD be transitioned out of usage. Default value is false. */
  deprecated?: boolean;
  /** Sets the ability to pass empty-valued parameters. This is valid only for query parameters and allows sending a parameter with an empty value. Default value is false. If style is used, and if behavior is n/a (cannot be serialized), the value of allowEmptyValue SHALL be ignored. Use of this property is NOT RECOMMENDED, as it is likely to be removed in a later revision. */
  allowEmptyValue?: boolean;
}

/** Lists the required security schemes to execute this operation. */
export type SecurityRequirementObject = { [name: string]: string[] };

export type Headers = Record<string, string>;

export interface HeaderObject {
  // note: this extends ParameterObject, minus "name" & "in"
  type?: string; // required
  description?: string;
  required?: boolean;
  schema: ReferenceObject | SchemaObject;
}

export interface LinkObject {
  operationRef?: string;
  operationId?: string;
  parameters?: (ReferenceObject | ParameterObject)[];
  requestBody?: RequestBody;
  description?: string;
}

export interface ParameterObject {
  name?: string; // required
  in?: "query" | "header" | "path" | /* V3 */ "cookie" | /* V2 */ "formData" | /* V2 */ "body"; // required
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  schema?: ReferenceObject | SchemaObject; // required
  type?: "string" | "number" | "integer" | "boolean" | "array" | "file"; // V2 ONLY
  items?: ReferenceObject | SchemaObject; // V2 ONLY
  enum?: string[]; // V2 ONLY
}

export type ReferenceObject = { $ref: string };

export interface ResponseObject {
  description?: string;
  headers?: Record<string, ReferenceObject | HeaderObject>;
  schema?: ReferenceObject | SchemaObject; // V2 ONLY
  links?: Record<string, ReferenceObject | LinkObject>; // V3 ONLY
  content?: {
    // V3 ONLY
    [contentType: string]: { schema: ReferenceObject | SchemaObject };
  };
}

export interface RequestBody {
  description?: string;
  content?: {
    [contentType: string]: { schema: ReferenceObject | SchemaObject };
  };
}

export interface SchemaObject {
  title?: string; // ignored
  description?: string;
  required?: string[];
  enum?: string[];
  type?: string; // assumed "object" if missing
  items?: ReferenceObject | SchemaObject;
  allOf?: SchemaObject;
  properties?: Record<string, ReferenceObject | SchemaObject>;
  default?: any;
  additionalProperties?: boolean | ReferenceObject | SchemaObject;
  nullable?: boolean; // V3 ONLY
  oneOf?: (ReferenceObject | SchemaObject)[]; // V3 ONLY
  anyOf?: (ReferenceObject | SchemaObject)[]; // V3 ONLY
  format?: string; // V3 ONLY
}

export type SchemaFormatter = (schemaObj: SchemaObject) => string | undefined;

export interface SwaggerToTSOptions {
  /** Allow arbitrary properties on schemas (default: false) */
  additionalProperties?: boolean;
  /** (optional) Specify auth if using openapi-typescript to fetch URL */
  auth?: string;
  /** (optional) Specify current working directory (cwd) to resolve remote schemas on disk (not needed for remote URL schemas) */
  cwd?: URL;
  /** Specify a formatter */
  formatter?: SchemaFormatter;
  /** Generates immutable types (readonly properties and readonly array) */
  immutableTypes?: boolean;
  /** (optional) If supplied, an omitted reponse \`content\` property will be generated as \`never\` instead of \`unknown\` */
  contentNever?: boolean;
  /** (optional) Treat schema objects with default values as non-nullable */
  defaultNonNullable?: boolean;
  /** (optional) Path to Prettier config */
  prettierConfig?: string;
  /** (optional) Parsing input document as raw schema rather than OpenAPI document */
  rawSchema?: boolean;
  /** (optional) Generate an enum containing all API paths. **/
  makePathsEnum?: boolean;
  /** (optional) Should logging be suppressed? (necessary for STDOUT) */
  silent?: boolean;
  /** (optional) OpenAPI version. Must be present if parsing raw schema */
  version?: number;
  /**
   * (optional) List of HTTP headers that will be sent with the fetch request to a remote schema. This is
   * in addition to the authorization header. In some cases, servers require headers such as Accept: application/json
   * or Accept: text/yaml to be sent in order to figure out how to properly fetch the OpenAPI/Swagger document as code.
   * These headers will only be sent in the case that the schema URL protocol is of type http or https.
   */
  httpHeaders?: Headers;
  /**
   * HTTP verb used to fetch the schema from a remote server. This is only applied
   * when the schema is a string and has the http or https protocol present. By default,
   * the request will use the HTTP GET method to fetch the schema from the server.
   *
   * @default {string} GET
   */
  httpMethod?: string;
  /**
   * (optional) Export type instead of interface
   */
  exportType?: boolean;
  /**
   * (optional) Generate tuples using array minItems / maxItems
   */
  supportArrayLength?: boolean;
  /**
   * (optional) Substitute path parameter names with their respective types.
   */
  pathParamsAsTypes?: boolean;
  /**
   * (optional) Provide your own comment header that prefixes the generated file.
   * Note this isn’t validated, so any string entered will be accepted as-is.
   */
  commentHeader?: string;
}

/** Context passed to all submodules */
export interface GlobalContext {
  additionalProperties: boolean;
  auth?: string;
  commentHeader: string;
  defaultNonNullable: boolean;
  formatter?: SchemaFormatter;
  immutableTypes: boolean;
  contentNever: boolean;
  makePathsEnum: boolean;
  namespace?: string;
  pathParamsAsTypes?: boolean;
  rawSchema: boolean;
  silent?: boolean;
  supportArrayLength?: boolean;
  version: number;
}
