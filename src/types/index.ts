type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
export type Color = RGB | RGBA | HEX;

export type AppStackParamList = {
  Main: undefined;
  Home: undefined;
  LeaveReviewToUser: undefined;
  LeaveReview: {
    phone?: string;
  };
  MyProfile: undefined;
  NullComponent: undefined;
  Services: undefined;
  LeaveReviewHome: undefined;
  SearchResult: undefined;
  Auth: undefined;
};

export type AuthStackParamList = {
  SignIn: undefined;
  CodeVerification: undefined;
  SignUp: undefined;
  SignUpAsPerformer: undefined;
  SignUpSelectService: undefined;
};
