exports.NetworkMod = function (mod) {
  mod.command.add("cutscene", {
    skip: () => {
      mod.settings.enable = !mod.settings.enable;
      mod.command.send(`Auto Cutscene was ${mod.settings.enable ? "en" : "dis"}abled`);
    },
    play: (num) => {
      const movie = parseInt(num);
      if (!movie) return;
      mod.command.send(`Attempted to play cutscene ${movie}`);
      mod.send("S_PLAY_MOVIE", 1, { movie });
    },
  });

  mod.hook("S_PLAY_MOVIE", 1, ({ movie }) => {
    if (!mod.settings.enable) return;
    mod.send("C_END_MOVIE", 1, { movie, unk: 1 });
    return false;
  });

  this.destructor = () => {
    mod.command.remove("cutscene");
  };
};
