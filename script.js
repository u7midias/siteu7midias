const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const form = document.querySelector('#briefingForm');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const message = `Olá, U7 Mídias! Quero um diagnóstico para minha empresa.%0A%0A` +
    `*Nome do estabelecimento:* ${encodeURIComponent(data.get('empresa'))}%0A` +
    `*Tipo de negócio:* ${encodeURIComponent(data.get('tipo'))}%0A` +
    `*Cidade e bairro:* ${encodeURIComponent(data.get('cidade'))}%0A` +
    `*Instagram:* ${encodeURIComponent(data.get('instagram') || 'Não informado')}%0A` +
    `*Maior desafio:* ${encodeURIComponent(data.get('desafio'))}%0A` +
    `*Objetivo:* ${encodeURIComponent(data.get('objetivo'))}`;
  window.open(`https://wa.me/5511934121551?text=${message}`, '_blank');
});
