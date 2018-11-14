import Typograph from '../dist/bundle';

const typed = new Typograph({
  keyboard: 'azerty',
  selector: '.typeMe',
});

typed.type();
