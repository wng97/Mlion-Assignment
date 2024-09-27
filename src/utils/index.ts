import axios from "axios";

export class CustomError extends Error {
  statusCode: number;
  details: any;

  constructor(message: string, statusCode: number = 500, details: any = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const calculateLengthAndHeight = (
  coordinate: number[][]
): { containerLength: number; containerHeight: number } => {
  const sameXDiffY = [];
  const sameYDiffX = [];

  // Find pairs with same x but different y
  for (let i = 0; i < coordinate.length; i++) {
    for (let j = i + 1; j < coordinate.length; j++) {
      const [x1, y1] = coordinate[i];
      const [x2, y2] = coordinate[j];

      // Check for same x, different y
      if (x1 === x2 && y1 !== y2 && sameXDiffY.length < 2) {
        sameXDiffY.push(coordinate[i], coordinate[j]);
      }

      // Check for same y, different x
      if (y1 === y2 && x1 !== x2 && sameYDiffX.length < 2) {
        sameYDiffX.push(coordinate[i], coordinate[j]);
      }
    }
  }
  const maxLength = Math.max(sameYDiffX[0][0], sameYDiffX[1][0]);
  const minLength = Math.min(sameYDiffX[0][0], sameYDiffX[1][0]);

  const containerLength = maxLength - minLength;

  const maxHeight = Math.max(sameXDiffY[0][1], sameXDiffY[1][1]);
  const minHeight = Math.min(sameXDiffY[0][1], sameXDiffY[1][1]);
  const containerHeight = maxHeight - minHeight;

  return { containerLength, containerHeight };
};

export const callGetLocationApi = async (location_id: number) => {
  const location = await axios.get(
    `http://localhost:5001/locations/${location_id}`
  );
  return location.data;
};
