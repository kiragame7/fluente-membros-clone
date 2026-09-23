import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function Router() {
  return <WouterRouter base={import.meta.env.BASE_URL}><Switch>
    <Route path="/" component={() => <Home view="auth" />} />
    <Route path="/auth" component={() => <Home view="auth" />} />
    <Route path="/dashboard" component={() => <Home view="dashboard" />} />
    <Route path="/modules" component={() => <Home view="modules" />} />
    <Route component={() => <Home view="dashboard" />} />
  </Switch></WouterRouter>;
}
export default function App() { return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster/><Router/></TooltipProvider></ThemeProvider></ErrorBoundary>; }
