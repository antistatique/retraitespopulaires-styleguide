---
title: Pagination
name: pagination
collection: atoms
notes: |
  Can be wrapped in `.theme-[theme]` to change look
---
<nav aria-label="Pagination">
  <ul class="pagination">
    <li>
      <a class="btn btn-primary btn-outline btn-circle" href="#">
        <span aria-hidden="true" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin retraitespopulaires-icon-flip-horizontal" ></span>
        <span class="sr-only">Previous</span>
      </a>
    </li>
    <li><a class="btn btn-primary btn-outline btn-circle" href="#">1</a></li>
    <li class="active"><a href="#" class="btn btn-primary btn-outline btn-circle">2</a></li>
    <li><a href="#" class="btn btn-primary btn-outline btn-circle">3</a></li>
    <li><a href="#" class="btn btn-primary btn-outline btn-circle">4</a></li>
    <li><a href="#" class="btn btn-primary btn-outline btn-circle">5</a></li>
    <li>
      <a href="#" class="btn btn-primary btn-outline btn-circle">
        <span aria-hidden="true" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin" ></span>
          <span class="sr-only">Next</span>
      </a>
    </li>
  </ul>
</nav>
