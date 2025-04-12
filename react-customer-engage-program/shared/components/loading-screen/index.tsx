import Loading from "../../../ui-components/Loading";

function LoadingScreen() {
  return (
    <div className="bg-theme-background-primary h-screen w-full flex items-center justify-center gap-2">
      <Loading size="_2xl" theme="primary" />
      <span className="text-theme-secondary">Loading..</span>
    </div>
  );
}

export default LoadingScreen;
