import styles from "./Loader.module.scss";

type Props = {
  color?: string;
};

const Loader = ({ color = "#fff" }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      preserveAspectRatio="xMidYMid"
      style={{
        margin: "auto",
        background: "0 0",
        display: "block",
        shapeRendering: "auto",
      }}
      viewBox="0 0 100 100"
    >
      <circle cx="84" cy="50" r="10" fill="#fff">
        <animate
          attributeName="r"
          begin="0s"
          calcMode="spline"
          dur="0.6756756756756757s"
          keySplines="0 0.5 0.5 1"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="10;0"
        />
        <animate
          attributeName="fill"
          begin="0s"
          calcMode="discrete"
          dur="2.7027027027027026s"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values={`${color};${color};${color};${color};${color}`}
        />
      </circle>
      <circle cx="16" cy="50" r="10" fill={color}>
        <animate
          attributeName="r"
          begin="0s"
          calcMode="spline"
          dur="2.7027027027027026s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="0;0;10;10;10"
        />
        <animate
          attributeName="cx"
          begin="0s"
          calcMode="spline"
          dur="2.7027027027027026s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="16;16;16;50;84"
        />
      </circle>
      <circle cx="50" cy="50" r="10" fill={color}>
        <animate
          attributeName="r"
          begin="-0.6756756756756757s"
          calcMode="spline"
          dur="2.7027027027027026s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="0;0;10;10;10"
        />
        <animate
          attributeName="cx"
          begin="-0.6756756756756757s"
          calcMode="spline"
          dur="2.7027027027027026s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="16;16;16;50;84"
        />
      </circle>
      <circle cx="84" cy="50" r="10" fill={color}>
        <animate
          attributeName="r"
          begin="-1.3513513513513513s"
          calcMode="spline"
          dur="2.7027027027027026s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="0;0;10;10;10"
        />
        <animate
          attributeName="cx"
          begin="-1.3513513513513513s"
          calcMode="spline"
          dur="2.7027027027027026s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="16;16;16;50;84"
        />
      </circle>
      <circle cx="16" cy="50" r="10" fill={color}>
        <animate
          attributeName="r"
          begin="-2.027027027027027s"
          calcMode="spline"
          dur="2.7027027027027026s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="0;0;10;10;10"
        />
        <animate
          attributeName="cx"
          begin="-2.027027027027027s"
          calcMode="spline"
          dur="2.7027027027027026s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="16;16;16;50;84"
        />
      </circle>
    </svg>
  );
};

export default Loader;
