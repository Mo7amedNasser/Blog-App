import { SpinnerCircularFixed } from "spinners-react";

export const SpinnerBtn = () => {
  return (
    <div className="flex items-center justify-center m-auto">
      <SpinnerCircularFixed
        size={40}
        thickness={100}
        speed={130}
        color="rgba(57, 172, 91, 1)"
        secondaryColor="rgba(172, 57, 68, 0.63)"
      />
    </div>
  );
};
