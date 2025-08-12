 document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', e=>{
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if(!target) return window.scrollTo({top:0,behavior:'smooth'});
        window.scrollTo({top: target.offsetTop - 20, behavior:'smooth'});
      });
    });

    // Mobile nav: clone desktop links
    const primary = document.getElementById('primary-nav');
    const mobileNav = document.getElementById('mobile-nav');
    const toggle = document.querySelector('.mobile-toggle');
    function buildMobile(){
      mobileNav.innerHTML = '';
      const clone = primary.cloneNode(true);
      clone.style.display = 'flex';
      clone.style.flexDirection = 'column';
      clone.querySelectorAll('a').forEach(a=>a.style.padding='12px 8px');
      mobileNav.appendChild(clone);
    }
    buildMobile();

    toggle.addEventListener('click', ()=>{
      const showing = mobileNav.style.display !== 'none' && mobileNav.style.display !== '';
      mobileNav.style.display = showing ? 'none' : 'block';
      toggle.setAttribute('aria-expanded', String(!showing));
    });

    // Intersection observer to reveal elements and set active nav link
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.setAttribute('data-revealed','true');
          e.target.removeAttribute('data-hidden');
          // active link handling
          const id = e.target.id;
          if(id){
            document.querySelectorAll('nav a').forEach(link=>link.classList.remove('active'));
            const link = document.querySelector(`nav a[href='#${id}']`);
            if(link) link.classList.add('active');
          }
        }
      })
    },{threshold:0.18});

    document.querySelectorAll('main section, .photo, .card, .project-card, .about-meta').forEach(node=>{
      node.setAttribute('data-hidden','');
      observer.observe(node);
    });

    // helper to open project links
    function openProject(url){ window.open(url,'_blank'); }

    // accessible keyboard support for project cards
    document.querySelectorAll('.project-card').forEach(card=>{
      card.setAttribute('tabindex','0');
      card.addEventListener('keypress', e=>{ if(e.key === 'Enter') card.click(); });
    });

    // light error handling for missing profile image
    document.querySelectorAll('img').forEach(img=>{
      img.onerror = ()=>{ img.src='https://i.ibb.co/bs2kJ0W/default-avatar.png' }
    });
