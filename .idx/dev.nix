{pkgs}: {
  channel = "stable-23.11";
  packages = [
    pkgs.nodejs_18
    pkgs.corepack
  ];
  idx.extensions = [ "biomejs.biome" "bradlc.vscode-tailwindcss"];
  idx.previews = {
    previews = {};
  };
}
