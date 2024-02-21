export enum HttpStatus {
  ERROR = 404,
  SUCCESS = 200,
};

export enum HttpMessage {
  ERROR = 'Server Internal Error',
  SUCCESS = 'Server Response Success',
};

export enum DataStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
};

export enum ResponseMessage {
  SERVER_INTERNAL_ERROR = 'Operation failed',
  GET_DATA_SUCCESS = 'Products retrieved successfully',
  CREATE_SUCCESS = 'Product created successfully.',
  UPDATE_SUCCESS = 'Product updated successfully',
}